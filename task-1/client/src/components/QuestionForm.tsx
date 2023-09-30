import { useState, useEffect } from "react";
import {
  Para,
  ShortPara,
  BooleanQuestion,
  DropDownQuestion,
  MultipleChoiceQuestion,
  DateQuestion,
  NumberQuestion,
  FileUploadQuestion,
  VideoQuestion,
} from "../interfaces";
import {
  Button,
  Checkbox,
  Space,
  Form,
  Input,
  Select,
  Alert,
  InputNumber,
  DatePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import QuestionTypes from "../enum";

interface Props {
  data?:
    | Para
    | ShortPara
    | BooleanQuestion
    | DropDownQuestion
    | MultipleChoiceQuestion
    | DateQuestion
    | NumberQuestion
    | FileUploadQuestion
    | VideoQuestion;
  id: string;
  formSave: (id: string, change: any, fromWhere: string) => void;
  formCancel: (id: string, fromWhere: string) => void;
  isEditQuestion?: boolean;
}

const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

const fileType = [
  "PDF",
  "Word Doc",
  "JPG",
  "PNG",
  "GIF",
  "Video",
  "Audio",
  "CSV",
  "ZIP",
];

export default function QuestionForm({
  id,
  data,
  formCancel,
  formSave,
  isEditQuestion = false,
}: Props) {
  const [questionType, setQuestionType] = useState(
    (() => {
      if (data) {
        return data.type;
      } else {
        return QuestionTypes.Paragraph;
      }
    })()
  );

  const [alertList, setAlertList] = useState([]);

  const [fileTypeCheckedList, setFileTypeCheckedList] = useState<
    CheckboxValueType[]
  >(
    (() => {
      if (data && data.type === "FileUpload") {
        return (data as any).fileType;
      } else {
        return fileType;
      }
    })()
  );

  const [durationType, setDurationType] = useState("minutes");

  const checkAll = fileType?.length === fileTypeCheckedList.length;
  const indeterminate =
    fileTypeCheckedList.length > 0 &&
    fileTypeCheckedList.length < fileType.length;

  const onFinish = (values: any) => {
    let result = values;
    result.type = questionType;
    result.id = id;

    if (questionType === "Dropdown" || questionType === "MultipleChoice") {
      result.choices = values.choices.map((item: any) => item.choice);
      result.other = result.other ? true : false;
    }

    if (questionType === "FileUpload") {
      result.fileType = fileTypeCheckedList;
    }

    if (questionType === "Video") {
      result.durationType = durationType;
    }

    formSave(id, result, isEditQuestion ? "existing" : "new");
    setAlertList([]);
  };

  const onFinishFailed = (errorInfo: any) => {
    let errorList = errorInfo.errorFields.map((error: any) => {
      return error.errors[0];
    });
    setAlertList(errorList);
  };

  const filterTypeOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  function onTypeSelectChange(value: string) {
    setQuestionType(value);
  }

  function onFileTypeCheckAllChange(e: CheckboxChangeEvent) {
    setFileTypeCheckedList(e.target.checked ? fileType : []);
  }

  function onFileTypeCheckChange(list: CheckboxValueType[]) {
    setFileTypeCheckedList(list);
  }

  function onDurationTypeChange(value: string) {
    setDurationType(value);
  }

  function setFormInitialValue() {
    if (!data) return undefined;

    let value: any = {};

    value.question = data.question;

    if (data.type === "Dropdown" || data.type === "MultipleChoice") {
      let defaultValues = (data as MultipleChoiceQuestion).choices.map(
        (choice) => ({ choice })
      );
      value.choices = defaultValues;
      value.other = (data as MultipleChoiceQuestion).other;

      if (data.type === "MultipleChoice") {
        value.maxChoice = (data as MultipleChoiceQuestion).maxChoice;
      }
    }

    if (data.type === "FileUpload") {
      value.fileSize = (data as FileUploadQuestion).fileSize;
    }

    if (data.type === "Number") {
      value.max = (data as NumberQuestion).max;
      value.min = (data as NumberQuestion).min;
    }

    return value;
  }

  return (
    <div key={id} className="pt-6 flex flex-col gap-5">
      {!isEditQuestion && <h2 className="text-base font-bold">Add Question</h2>}

      {!isEditQuestion && (
        <div>
          <label className="font-semibold text-sm block mb-2">Type</label>
          <Select
            className="w-full"
            showSearch
            filterOption={filterTypeOption}
            defaultValue={QuestionTypes.Paragraph}
            onChange={onTypeSelectChange}
            options={[
              {
                value: QuestionTypes.Paragraph,
                label: "Paragraph",
              },
              {
                value: QuestionTypes.ShortAnswer,
                label: "Short answer",
              },
              {
                value: QuestionTypes.YesNo,
                label: "Yes/No",
              },
              {
                value: QuestionTypes.Dropdown,
                label: "Dropdown",
              },
              {
                value: QuestionTypes.MultipleChoice,
                label: "Multiple choice",
              },
              {
                value: QuestionTypes.Date,
                label: "Date",
              },
              {
                value: QuestionTypes.Number,
                label: "Number",
              },
              {
                value: QuestionTypes.FileUpload,
                label: "File upload",
              },
              // {
              //   value: QuestionTypes.Video,
              //   label: "Video question",
              // },
            ]}
          />
        </div>
      )}

      <Form
        name={`Question Form-${id}`}
        className="w-full"
        style={{ width: "100%" }}
        labelCol={{ span: 100 }}
        wrapperCol={{ span: 100 }}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        initialValues={setFormInitialValue()}
      >
        <Form.Item
          label={<span className="text-sm font-bold">Question</span>}
          name="question"
          rules={[
            { required: true, message: "Please enter the question!" },
            {
              validator: (_, value) => {
                if (value && value.trim().length === 0) {
                  return Promise.reject("Question cannot be just spaces!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        {(questionType === "Dropdown" || questionType === "MultipleChoice") && (
          <>
            <Form.List
              name="choices"
              rules={[
                {
                  validator: async (_, choices) => {
                    if (!choices || choices.length < 1) {
                      throw new Error("At least one choice is required");
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  <p className="tex-sm font-bold mb-1">Choice</p>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "choice"]}
                        rules={[
                          { required: true, message: "Missing Choice" },
                          {
                            validator: (_, value) => {
                              if (value && value.trim().length === 0) {
                                return Promise.reject(
                                  "Choice cannot be just spaces!"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input placeholder="Type here" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      )}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Choice
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item name="other" valuePropName="checked">
              <Checkbox className="text-sm font-semibold">
                Enable "Other" option
              </Checkbox>
            </Form.Item>

            {questionType === "MultipleChoice" && (
              <>
                <Form.Item
                  className="w-full"
                  name="maxChoice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Maximum number of Choices",
                    },
                  ]}
                  label={
                    <span className="font-bold text-sm w-full">
                      Max choice allowed
                    </span>
                  }
                >
                  <InputNumber
                    min={1}
                    className="w-full"
                    placeholder="Enter number of choice allowed here"
                  />
                </Form.Item>
              </>
            )}
          </>
        )}

        {/* {questionType === "Date" && (
          <>
            <Form.Item
              rules={[{ required: true, message: "Please enter Date!" }]}
              name="date"
              label={<span className="font-bold text-sm">Date</span>}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </>
        )} */}

        {questionType === "Number" && (
          <div className="flex align-top gap-5">
            <Form.Item
              rules={[{ required: true, message: "Please enter Min Number!" }]}
              className="w-full"
              name="min"
              label={<span className="font-bold text-sm w-full">Min</span>}
            >
              <InputNumber className="w-full" placeholder="Type nuber here" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please enter Max Number!" }]}
              className="w-full"
              name="max"
              label={<span className="font-bold text-sm w-full">Max</span>}
            >
              <InputNumber className="w-full" placeholder="Type nuber here" />
            </Form.Item>
          </div>
        )}

        {questionType === "FileUpload" && (
          <>
            <Form.Item
              rules={[
                {
                  validator: async () => {
                    if (
                      !fileTypeCheckedList ||
                      fileTypeCheckedList.length < 1
                    ) {
                      throw new Error("Please check at leat one file type");
                    }
                  },
                },
              ]}
              className="w-full"
              name="fileType"
              label={
                <span className="font-bold text-sm w-full">File type</span>
              }
            >
              <div>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onFileTypeCheckAllChange}
                  checked={checkAll}
                >
                  Check all
                </Checkbox>
                <CheckboxGroup
                  options={fileType}
                  value={fileTypeCheckedList}
                  onChange={onFileTypeCheckChange}
                />
              </div>
            </Form.Item>

            <Form.Item
              className="w-full"
              name="fileSize"
              label={
                <span className="font-bold text-sm w-full">File Size (MB)</span>
              }
              rules={[
                { required: true, message: "Please specify the File Size!" },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="Enter file size in MB"
              />
            </Form.Item>
          </>
        )}

        {/* {questionType === "Video" && (
          <>
            <Form.Item
              name="videoDescription"
              label={
                <span className="font-bold text-sm">Video description</span>
              }
              rules={[
                { required: true, message: "Please Enter Video Description" },
              ]}
            >
              <TextArea className="w-full" rows={4} />
            </Form.Item>

            <div className="flex items-center gap-3 mb-5">
              <Form.Item
                name="videoDuration"
                className="mb-0 flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please specify the length of the Video!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  placeholder="Max duration of Video"
                />
              </Form.Item>
              <Select
                defaultValue={durationType}
                onChange={onDurationTypeChange}
                options={[
                  {
                    value: "minutes",
                    label: "Minutes",
                  },
                  {
                    value: "seconds",
                    label: "Seconds",
                  },
                ]}
              />
            </div>
          </>
        )} */}

        <div className="flex w-full items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              let fromWhere = isEditQuestion ? "existing" : "new";
              formCancel(id, fromWhere);
            }}
          >
            <svg
              height="12px"
              viewBox="0 0 365.71733 365"
              width="12px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#A80000">
                <path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" />
                <path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" />
              </g>
            </svg>
            <span className="text-xs text-red-900 font-semibold">
              Delete question
            </span>
          </div>
          <Form.Item className="flex mb-0 items-center justify-between">
            <Button type="default" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>

      {alertList?.length > 0 && (
        <>
          <div className="fixed top-0 left-1/2 -translate-x-1/2 my-2">
            <Alert
              message={
                <ul>
                  {alertList.map((alert, index) => (
                    <p key={index} className="mb-1">
                      {alert}
                    </p>
                  ))}
                </ul>
              }
              type="error"
              closable
              closeIcon
              onClose={() => {
                setAlertList([]);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
