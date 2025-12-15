"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";
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
  Select,
  notification,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "react-quill-new/dist/quill.snow.css";

import "../accelerators.scss";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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

const apiUrl = (path: string) => {
  // if (typeof window !== "undefined") {
  //   return new URL(path, window.location.origin).toString();
  // }
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/datacosmos";
  return base + path;
};

export default function NewAccelerator({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const router = useRouter();

  const [api_notification, notificationHolder] = notification.useNotification(); // add this

  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingItem, setLoadingItem] = useState<boolean>(true);
  const params = use(searchParams);
  // const searchParams = useSearchParams();
  const accelId = params?.id; //.get("id");

  const [iconFileList, setIconFileList] = useState<any[]>([]);
  const [bannerFileList, setBannerFileList] = useState<any[]>([]);
  const [videoFileList, setVideoFileList] = useState<any[]>([]);
  const [dataOfferings, setDataOfferings] = useState<any[]>([]);
  const [detailedDiscussion, setDetailedDiscussion] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl("/api/data-offerings"));
        if (!res.ok) throw new Error("Failed to load data offerings");
        const json = await res.json();
        console.log("Fetched data offerings:", json);
        let offeringsArr: any[] = [];
        if (Array.isArray(json)) {
          offeringsArr = json.flatMap((item: any) =>
            Array.isArray(item.offerings) ? item.offerings : []
          );
        } else if (Array.isArray(json?.offerings)) {
          offeringsArr = json.offerings;
        }
        // Use offering name as value (schema stores name string)
        setDataOfferings(
          offeringsArr.map((o: any) => ({ label: o.name, value: o.name }))
        );
      } catch (e: any) {
        console.error(e);
        message.error(e.message || "Could not load data offerings");
      }

      if (accelId) {
        try {
          const r = await fetch(apiUrl(`/api/accelerator/${accelId}`));
          if (!r.ok) throw new Error("Failed to load accelerator");
          const item = await r.json();
          form.setFieldsValue({
            name: item.name,
            summary: item.summary,
            description: item?.description,
            dataOffering: item?.dataOffering || undefined,
            dockerProjectName: item?.dockerProjectName || "",
          });
          if (item.iconUrl)
            setIconFileList([
              {
                uid: "icon-1",
                name: "icon",
                status: "done",
                url: item.iconUrl,
              },
            ]);
          if (item.imageUrl)
            setBannerFileList([
              {
                uid: "banner-1",
                name: "banner",
                status: "done",
                url: item.imageUrl,
              },
            ]);
          if (item.videoUrl)
            setVideoFileList([
              {
                uid: "video-1",
                name: "video",
                status: "done",
                url: item.videoUrl,
              },
            ]);

          // Set the ReactQuill controlled value
          setDetailedDiscussion(item?.summary || "");
        } catch (e: any) {
          message.error(e.message || "Could not load accelerator");
        } finally {
          setLoadingItem(false);
        }
      } else {
        setLoadingItem(false);
      }
    })();
  }, [accelId]);

  // Optional handler if you want to react immediately to selection changes
  const handleDataOfferingChange = (val: string) => {
    // You can perform side-effects here if needed
    // console.log("Selected data offering:", val);
  };

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
      formData.append("description", values.description || "");
      formData.append("summary", detailedDiscussion || "");
      formData.append("dataOffering", values.dataOffering || "");
      formData.append("dockerProjectName", values.dockerProjectName || "");

      const icon_image = iconFileList[0]?.originFileObj;
      const banner_image = bannerFileList[0]?.originFileObj;
      const vid = videoFileList[0]?.originFileObj;

      if (icon_image)
        formData.append("icon", icon_image as File, (icon_image as File).name);
      if (banner_image)
        formData.append(
          "image",
          banner_image as File,
          (banner_image as File).name
        );
      if (vid) formData.append("video", vid as File, (vid as File).name);

      setProgress(40);
      const method = accelId ? "PUT" : "POST";
      const url = accelId
        ? apiUrl(`/api/accelerator/${accelId}`)
        : apiUrl("/api/accelerator");
      const res = await fetch(url, { method, body: formData });

      setProgress(70);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Upload failed with ${res.status}`);
      }

      setProgress(100);

      const data = await res.json();
      form.resetFields();
      setIconFileList([]);
      setBannerFileList([]);
      setVideoFileList([]);
      setDetailedDiscussion("");
      console.log("Saved accelerator:", data);
      // Show top-right snackbar notification on success
      api_notification.success({
        message: accelId ? "Accelerator updated" : "Accelerator created",
        description: "Your changes have been saved successfully.",
        placement: "topRight",
        duration: 3,
      });

      // Optional: redirect or show link
      setTimeout(() => {
        router.push("/accelerators/list");
      }, 3000);
    } catch (e: any) {
      console.error(e);
      message.error(e.message || "Failed to save item");
    } finally {
      setSubmitting(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  // const rules = {
  //   name: [{ required: true, message: "Please enter a name" }],
  //   summary: [{ max: 2000, message: "Too long (max 2000 chars)" }],
  // };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>
      {notificationHolder} {/* required for notifications to render */}
      <Card>
        <Title level={3} style={{ marginBottom: 0 }}>
          {accelId ? `Edit Accelerator` : "Create Accelerator"}
        </Title>
        {/* <Text type="secondary">Upload image & video, then click Save.</Text> */}

        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
          onFinish={onFinish}
          // requiredMark="optional"
        >
           <Form.Item label="Name" name="name"> {/*rules={rules.name}  */}
            <Input
              placeholder={
                accelId ? "Edit accelerator name" : "Enter item name"
              }
              disabled={loadingItem}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              placeholder="Add a short summary or description"
              autoSize={{ minRows: 3 }}
              disabled={loadingItem}
            />
          </Form.Item>

          <Form.Item label="Summary" name="summary" /*rules={rules.summary}*/>
            {/*  */}
            <div className="editor-flex">
              <ReactQuill
                theme="snow"
                value={detailedDiscussion}
                onChange={setDetailedDiscussion}
              />
            </div>
          </Form.Item>

          <Form.Item label="Data Offering" name="dataOffering">
            <Select
              placeholder="Select a data offering"
              loading={!dataOfferings.length}
              options={dataOfferings}
              allowClear
              showSearch
              optionFilterProp="label"
              onChange={handleDataOfferingChange}
              disabled={loadingItem}
            />
          </Form.Item>
          <Form.Item label="Docker Project Name" name="dockerProjectName">
            <Input
              placeholder="Enter Docker project name"
              disabled={loadingItem}
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

          {loadingItem && <p>Loading accelerator...</p>}

          <Form.Item>
            <div className="flex flex-1 justify-between">
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
              <Button
                onClick={() => {
                  form.resetFields();
                  setIconFileList([]);
                  setBannerFileList([]);
                  setVideoFileList([]);
                  router.push("/accelerators/list");
                }}
              >
                Cancel
              </Button>
            </div>
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
