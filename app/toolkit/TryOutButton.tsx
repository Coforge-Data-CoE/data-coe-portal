"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Progress, Spin, message } from "antd";

// Default session time in minutes
const DEFAULT_SESSION_MINUTES = 60;

export default function TryOutButton({ toolkitDockerProjectId, toolkitName }: { toolkitDockerProjectId: string, toolkitName: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"unknown"|"running"|"stopped"|"building">("unknown");
  const [loading, setLoading] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [exploreUrl, setExploreUrl] = useState<string | null>(null);
  const [sessionMinutes, setSessionMinutes] = useState<number>(DEFAULT_SESSION_MINUTES);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(DEFAULT_SESSION_MINUTES * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

  // Real API call to get status
  const fetchStatus = async () => {
    setLoading(true);
    try {
      // const testToolKit = "autoconvert-universal-rag";
      const res = await fetch(`${basePath}/api/toolkit/status?name=${encodeURIComponent(toolkitDockerProjectId)}`);
      const data = await res.json();
      if (data.running) {
        setStatus("running");
        // Extract port from data.ports string (e.g., "0.0.0.0:3008->3008/tcp, [")
        let portMatch = data.ports && data.ports.match(/:(\d+)->/);
        let port = portMatch ? portMatch[1] : "8080";
        // Use default external host
        const host = process.env.NEXT_PUBLIC_TOOLKIT_HOST || "coforge-data-cosmos-apps.eastus2.cloudapp.azure.com";
        setExploreUrl(`http://${host}:${port}`);
        setSessionMinutes(DEFAULT_SESSION_MINUTES);
        setRemainingSeconds(DEFAULT_SESSION_MINUTES * 60);
      } else {
        setStatus("stopped");
        setExploreUrl(null);
      }
    } catch {
      setStatus("unknown");
      setExploreUrl(null);
      message.error("Failed to fetch toolkit status.");
    }
    setLoading(false);
  };

  // Build & Start process: call backend API to start project
  const handleBuild = async () => {
    setStatus("building");
    setBuildProgress(0);
    try {
      const res = await fetch(`${basePath}/api/toolkit/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: toolkitDockerProjectId })
      });
      if (!res.ok) throw new Error("Failed to start toolkit");
      // Simulate progress bar while backend starts the project
      let progress = 0;
      const interval = setInterval(async () => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          // After build, fetch status to get port and update exploreUrl
          setStatus("running");
          try {
            const statusRes = await fetch(`${basePath}/api/toolkit/status?name=${encodeURIComponent(toolkitDockerProjectId)}`);
            const data = await statusRes.json();
            if (data.running) {
              let portMatch = data.ports && data.ports.match(/:(\d+)->/);
              let port = portMatch ? portMatch[1] : "8080";
              const host = process.env.NEXT_PUBLIC_TOOLKIT_HOST || "coforge-data-cosmos-apps.eastus2.cloudapp.azure.com";
              setExploreUrl(`http://${host}:${port}`);
            } else {
              setExploreUrl(null);
            }
          } catch {
            setExploreUrl(null);
          }
          setSessionMinutes(DEFAULT_SESSION_MINUTES);
          setRemainingSeconds(DEFAULT_SESSION_MINUTES * 60);
          message.success("Toolkit is now running!");
        }
        setBuildProgress(progress);
      }, 700);
    } catch (e: any) {
      setStatus("stopped");
      setBuildProgress(0);
      message.error(e.message || "Failed to start toolkit");
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (status === "running") {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [status]);

  // Extend session handler
  const handleExtend = () => {
    setSessionMinutes(m => m + DEFAULT_SESSION_MINUTES);
    setRemainingSeconds(s => s + DEFAULT_SESSION_MINUTES * 60);
    message.success("Session extended by 60 minutes.");
    // TODO: Call backend to extend session if needed
  };

  // Format timer as mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleOpen = () => {
    setOpen(true);
    setStatus("unknown");
    setExploreUrl(null);
    fetchStatus();
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("unknown");
    setBuildProgress(0);
    setExploreUrl(null);
  };

  return (
    <>
      <button className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition flex items-center" onClick={handleOpen}>Try Out</button>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        title={`Try Out: ${toolkitName}`}
        centered
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8"><Spin size="large" /></div>
        ) : status === "running" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-green-600 font-semibold">Toolkit is running!</div>
            <div className="text-gray-700 text-sm mb-2">Session time left: <span className="font-mono text-base">{formatTime(remainingSeconds)}</span></div>
            <div className="flex gap-2">
              <Button type="primary" href={exploreUrl || "#"} target="_blank" className="bg-blue-600 hover:bg-blue-700">Explore</Button>
              <Button onClick={handleExtend} className="bg-[#f15840] hover:bg-[#d94c2f] text-white">Extend 60 min</Button>
            </div>
          </div>
        ) : status === "stopped" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-orange-600 font-semibold">Toolkit is not running.</div>
            <Button type="primary" onClick={handleBuild} className="bg-[#f15840] hover:bg-[#d94c2f]">Build & Start</Button>
          </div>
        ) : status === "building" ? (
          <div className="flex flex-col items-center gap-4 py-4 w-full">
            <div className="text-blue-600 font-semibold">Building and starting the toolkit...</div>
            <Progress percent={buildProgress} status={buildProgress < 100 ? "active" : "success"} style={{ width: "100%" }} />
          </div>
        ) : null}
      </Modal>
    </>
  );
}
