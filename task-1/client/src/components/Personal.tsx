import { Data } from "../interfaces";
import Card from "../ui/Card";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Switch } from "antd";
import capitalizeFirstChar from "../utils/capitalizeFirstChar";
import { useEffect, useState } from "react";
import CustomQuestion from "./CustomQuestion";
import QuestionForm from "./QuestionForm";
import generateID from "../utils/generateUUID";

interface Props {
  formData: Data;
  triggerReq: (body: Data) => void;
}

export default function Personal({ formData, triggerReq }: Props) {
  const {
    data: {
      attributes: { personalInformation },
    },
  } = formData;

  const { personalQuestions, ...defaultQuestions } = personalInformation;

  const [newQuestionArray, setNewQuestionArray] = useState<any>([]);

  const onCheckBoxChange = (
    e: CheckboxChangeEvent,
    key: keyof typeof defaultQuestions
  ) => {
    const body = JSON.parse(JSON.stringify(formData));

    body.data.attributes.personalInformation[key].internalUse =
      e.target.checked;

    triggerReq(body);
  };

  const onSwitchChange = (checked: boolean, key: string) => {
    const body = JSON.parse(JSON.stringify(formData));

    body.data.attributes.personalInformation[key].show = checked;

    triggerReq(body);
  };

  function handleQuestionEdit(id: string, change: any, fromWhere: string) {
    const body = JSON.parse(JSON.stringify(formData));

    if (fromWhere === "new") {
      body.data.attributes.personalInformation.personalQuestions.push(change);
      setNewQuestionArray((prev: any) => {
        let newArr = prev.map((component: any) => component.id !== id);
        return newArr;
      });
    } else {
      let currQuestionIndex =
        body.data.attributes.personalInformation.personalQuestions.findIndex(
          (question: any) => question.id === id
        );

      body.data.attributes.personalInformation.personalQuestions[
        currQuestionIndex
      ] = change;
    }

    triggerReq(body);
  }

  function handleQuestionDelete(id: string, fromWhere: string) {
    const body = JSON.parse(JSON.stringify(formData));

    if (fromWhere === "new") {
      setNewQuestionArray((prev: any) => {
        let editedNewQuestionArray = prev.filter(
          (component: any) => component.key !== id
        );
        return editedNewQuestionArray;
      });
    } else {
      let editedCustomProfileQuestions =
        body.data.attributes.personalInformation.personalQuestions.filter(
          (question: any) => question.id !== id
        );

      body.data.attributes.personalInformation.personalQuestions =
        editedCustomProfileQuestions;
      triggerReq(body);
    }
  }

  function onAddQuestionComponent() {
    const uid = generateID();
    setNewQuestionArray((prev: any) => [
      ...prev,
      <QuestionForm
        key={uid}
        id={uid}
        formSave={handleQuestionEdit}
        formCancel={handleQuestionDelete}
      />,
    ]);
  }

  return (
    <Card title="Personal Information">
      <div className="py-5 px-5">
        {Object.keys(defaultQuestions).map((key, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 border-b border-opacity-20 border-b-gray-950"
          >
            <h3 className="font-semibold text-base">
              {capitalizeFirstChar(key)}
            </h3>
            <div className="flex items-center gap-4">
              <Checkbox
                className="font-medium text-sm"
                checked={
                  defaultQuestions[key as keyof typeof defaultQuestions]
                    .internalUse
                }
                onChange={(e) => {
                  onCheckBoxChange(e, key as keyof typeof defaultQuestions);
                }}
              >
                Internal
              </Checkbox>
              <span
                className="w-20 flex items-center justify-between text-sm
              "
              >
                <Switch
                  size="small"
                  checked={
                    defaultQuestions[key as keyof typeof defaultQuestions].show
                  }
                  onChange={(e) => {
                    onSwitchChange(e, key);
                  }}
                />
                <span>
                  {defaultQuestions[key as keyof typeof defaultQuestions].show
                    ? "Show"
                    : "Hide"}
                </span>
              </span>
            </div>
          </div>
        ))}

        {personalQuestions.map((data) => (
          <CustomQuestion
            key={data.id}
            handleDelete={handleQuestionDelete}
            handleEdit={handleQuestionEdit}
            data={data}
          />
        ))}

        {newQuestionArray.map((Component: any) => (
          <div key={Component.key}>{Component}</div>
        ))}

        <div
          className="flex w-fit items-center gap-3 pt-6 pb-4 cursor-pointer"
          onClick={onAddQuestionComponent}
        >
          <svg
            id="Layer_1"
            height="15px"
            viewBox="0 0 512 512"
            width="15px"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path
              d="m478 210.72h-176.72v-176.72a34 34 0 0 0 -34-34h-22.6a34 34 0 0 0 -34 34v176.72h-176.68a34 34 0 0 0 -34 34v22.64a34 34 0 0 0 34 34h176.72v176.64a34 34 0 0 0 34 34h22.64a34 34 0 0 0 34-34v-176.72h176.64a34 34 0 0 0 34-34v-22.6a34 34 0 0 0 -34-33.96z"
              fill="rgb(0,0,0)"
            />
          </svg>
          <span className="text-xs font-bold">Add a question</span>
        </div>
      </div>
    </Card>
  );
}
