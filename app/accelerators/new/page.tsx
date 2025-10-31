// app/accelerators/new/page.tsx
"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Space,
  message,
  Card,
  Typography,
  Modal,
  Progress,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

type FileType = Parameters<
  NonNullable<React.ComponentProps<typeof Upload>["beforeUpload"]>
>[0];

function getBase64(file: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export default function NewItemPage() {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const [iconFileList, setIconFileList] = useState<any[]>([]);
  const [bannerFileList, setBannerFileList] = useState<any[]>([]);
  const [videoFileList, setVideoFileList] = useState<any[]>([]);

  const onImagePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file?.originFileObj as File)
    }
    setImagePreview(file.url || file.preview);
    setImagePreviewOpen(true);
  };

  const iconProps = {
    name: "icon_image",
    multiple: false,
    maxCount: 1,
    listType: "picture-card" as const,
    beforeUpload: () => false, // prevent auto-upload
    fileList: iconFileList,
    onChange: ({ fileList }: any) => setIconFileList(fileList),
    onPreview: onImagePreview,
    accept: "image/*",
  };

  const bannerProps = {
    name: "banner_image",
    multiple: false,
    maxCount: 1,
    listType: "picture-card" as const,
    beforeUpload: () => false, // prevent auto-upload
    fileList: bannerFileList,
    onChange: ({ fileList }: any) => setBannerFileList(fileList),
    onPreview: onImagePreview,
    accept: "image/*",
  };

  const videoProps = {
    name: "video",
    multiple: false,
    maxCount: 1,
    beforeUpload: () => false,
    fileList: videoFileList,
    onChange: ({ fileList }: any) => setVideoFileList(fileList),
    accept: "video/*",
  };

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      setProgress(10);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("summary", values.summary || "");

      const icon_image = iconFileList[0]?.originFileObj;
      const banner_image = bannerFileList[0]?.originFileObj;
      const vid = videoFileList[0]?.originFileObj;

      // Append file objects if present (AntD Upload stores them on originFileObj when beforeUpload returns false)
      if (icon_image) formData.append("icon", icon_image as File, (icon_image as File).name);
      if (banner_image) formData.append("image", banner_image as File, (banner_image as File).name);
      if (vid) formData.append("video", vid as File, (vid as File).name);

      setProgress(40);
      // Debug entries
      for (const [key, value] of formData.entries()) {
        console.log("FormData entry:", key, value);
      }

      const res = await fetch("/api/accelerator", {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Upload failed with ${res.status}`);
      }

      setProgress(100);

      const data = await res.json();
      message.success("Accelerator saved successfully!");
      form.resetFields();
      setIconFileList([]);
      setBannerFileList([]);
      setVideoFileList([]);
      console.log("Saved accelerator:", data);
      // Optional: redirect or show link
      // router.push('/items')
    } catch (e: any) {
      console.error(e);
      message.error(e.message || "Failed to save item");
    } finally {
      setSubmitting(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  const rules = {
    name: [{ required: true, message: "Please enter a name" }],
    summary: [{ max: 2000, message: "Too long (max 2000 chars)" }],
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>
      <Card>
        <Title level={3} style={{ marginBottom: 0 }}>
          Create Accelerator
        </Title>
        {/* <Text type="secondary">Upload image & video, then click Save.</Text> */}

        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
          onFinish={onFinish}
          // requiredMark="optional"
        >
          <Form.Item label="Name" name="name" rules={rules.name}>
            <Input placeholder="Enter item name" />
          </Form.Item>

          <Form.Item
            label="Summary"
            name="summary"
            rules={rules.summary}
          >
            <Input.TextArea
              placeholder="Add a short summary or description"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>

          <Form.Item label="Icon">
            <Dragger {...iconProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: 24 }} />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">
                File Types JPG/PNG. Recommended size ~800x600px, Max ~5-10MB.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item label="Banner">
            <Dragger {...bannerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: 24 }} />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">
                File Types JPG/PNG. Recommended size ~800x600px, Max ~5-10MB.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item label="Video">
            <Dragger {...videoProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: 24 }} />
              </p>
              <p className="ant-upload-text">
                Click or drag a video file to this area
              </p>
              <p className="ant-upload-hint">
                MP4/WebM/MOV. Large files may take time.
              </p>
            </Dragger>
          </Form.Item>

          {progress > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Progress
                percent={progress}
                status={submitting ? "active" : "normal"}
              />
            </div>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Save
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  setIconFileList([]);
                  setBannerFileList([]);
                  setVideoFileList([]);
                }}
              >
                Reset
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
