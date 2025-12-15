"use client";
import React, { useState, useEffect, use } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  message,
  Card,
  Typography,
  Modal,
  Progress,
  Select,
} from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const toolkitIcons = [
  { file: "etl.png", label: "ETL Script Convertor" },
  { file: "abc.png", label: "ABC (Audit, Balance & Control) Framework" },
  { file: "agentic-dq-resolver.png", label: "Agentic DQ Resolver" },
  { file: "aps.png", label: "Agentic Production Support" },
  { file: "auto-classifier.png", label: "Auto Classifier" },
  { file: "backlog-analyzer.png", label: "Backlog Analyzer" },
  { file: "code-analyzer.png", label: "Code Analyzer" },
  { file: "data-360.png", label: "Data 360" },
  { file: "data-governance.png", label: "Data Governance Framework" },
  { file: "data-ingestion.png", label: "Data Ingestion Framework" },
  { file: "data-integration.png", label: "Data Integration Framework" },
  { file: "data-migration.png", label: "Data Migration" },
  { file: "data-quality.png", label: "Data Quality" },
  { file: "dg-nexus.png", label: "Dat Governance Nexus" },
  { file: "do-analyzer.png", label: "Data Objects Analyzer" },
  { file: "document-analyzer.png", label: "Document Analyzer" },
  { file: "file-preload-validation.png", label: "File Preload Validation" },
  {
    file: "intelligent-script-ingestion.png",
    label: "Intelligent Scriptless Ingestion",
  },
  { file: "kt-as-service.png", label: "KT as a Service" },
  { file: "llm-router.png", label: "LLM Router" },
  { file: "log-analyzer.png", label: "Log Analyzer" },
  { file: "product-querier.png", label: "Product Querier" },
  { file: "rrc.png", label: "Report Rationalizer & Converter" },
  { file: "stdg.png", label: "Synthetic Test Data Generator (STDG)" },
  { file: "ticker-analyzer.png", label: "Ticker Analyzer" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

export default function RaiseRequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const router = useRouter();

  const apiUrl = (path: string) => {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/datacosmos";
    return base + path;
  };

  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const params = use(searchParams);
  const accelId = params?.id;

  // Change it fetch from DB collection
  const toolkitOptions = toolkitIcons.map((item) => ({
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="bg-[#0d1436] border border-slate-700 px-1 py-1">
          <img
            src={`${basePath}/logos/toolkit/${item?.file}`}
            alt={item?.label}
            style={{ width: 12, height: 12, objectFit: "contain" }}
          />
        </span>
        <span className="text-xs text-semibold">{item.label}</span>
      </span>
    ),
    value: item.label,
  }));

  const handleDataOfferingChange = (val: string) => {};

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      setProgress(10);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("query", values.query || "");
      formData.append("dataOffering", values.dataOffering || "");

      setProgress(40);
      const method = accelId ? "PUT" : "POST";
      const url = apiUrl("/api/raise-request");
      const res = await fetch(url, { method, body: formData });

      setProgress(70);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Save failed with ${res.status}`);
      }

      setProgress(100);

      const data = await res.json();
      message.success("Request saved successfully!");
      form.resetFields();
      console.log("Saved request:", data);
    } catch (e: any) {
      console.error(e);
      message.error(e.message || "Failed to save request");
    } finally {
      setSubmitting(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  // const rules = {
  //   name: [{ required: true, message: "Please enter a name" }],
  //   query: [{ max: 5000, message: "Too long (max 5000 chars)" }],
  // };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>
      <Card>
        <Title level={3} style={{ marginBottom: 0 }}>
          Raise Request
        </Title>

        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name"> {/* rules={rules.name}  */}
            <Input
              placeholder={accelId ? "Edit name" : "Enter name"}
              disabled={loadingItem}
            />
          </Form.Item>

          <Form.Item label="Data Offering" name="dataOffering">
            <Select
              placeholder="Select a service"
              options={toolkitOptions}
              allowClear
              showSearch
              optionFilterProp="label"
              onChange={handleDataOfferingChange}
              disabled={loadingItem}
            />
          </Form.Item>

          <Form.Item label="Query" name="query"> {/* rules={rules.query} */}
            <Input.TextArea
              placeholder="Add a Query / Request details"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>

          {progress > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Progress
                percent={progress}
                status={submitting ? "active" : "normal"}
              />
            </div>
          )}

          {loadingItem && <p>Loading...</p>}

          <Form.Item>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  className="mr-2"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
              </div>
              <Button danger onClick={() => router.push("/datacosmos")}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        open={imagePreviewOpen}
        title="Image preview"
        footer={null}
        onCancel={() => setImagePreviewOpen(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={imagePreview} />
      </Modal>
    </div>
  );
}
