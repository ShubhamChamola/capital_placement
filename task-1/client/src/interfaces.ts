type personalInfoField = {
 internalUse: boolean;
 show: boolean;
}

type profileInfoField = {
 mandatory: boolean;
 show: boolean;
}

interface Question {
 id: string;
 type: string;
 question: string;
}

export interface Para extends Question { }

export interface ShortPara extends Question { }

export interface BooleanQuestion extends Question {
 disqualify: boolean;
}

export interface DropDownQuestion extends Question {
 choices: string[];
 other: boolean;
}

export interface MultipleChoiceQuestion extends Question {
 choices: string[];
 other: boolean;
 maxChoice: number;
}

export interface DateQuestion extends Question { }

export interface NumberQuestion extends Question {
 min: number;
 max: number;
}

export interface FileUploadQuestion extends Question {
 fileSize: number;
 fileType: String[];
}

export interface VideoQuestion extends Question {
 prompt: string;
 maxDuration: number;
 timeFormat: ["min", "sec"]
}

export interface Profile {

}

export interface Data {
 data: {
  id: string;
  type: string;
  attributes: {
   coverImage: string;
   personalInformation: {
    firstName: personalInfoField;
    lastName: personalInfoField;
    emailId: personalInfoField;
    phoneNumber: personalInfoField;
    nationality: personalInfoField;
    currentResidence: personalInfoField;
    idNumber: personalInfoField;
    dateOfBirth: personalInfoField;
    gender: personalInfoField;
    personalQuestions: (Para | ShortPara | BooleanQuestion | DropDownQuestion | MultipleChoiceQuestion | DateQuestion | NumberQuestion | FileUploadQuestion | VideoQuestion)[]
   };
   profile: {
    education: profileInfoField;
    experience: profileInfoField;
    resume: profileInfoField;
    profileQuestions: (Para | ShortPara | BooleanQuestion | DropDownQuestion | MultipleChoiceQuestion | DateQuestion | NumberQuestion | FileUploadQuestion | VideoQuestion)[]
   };
   customisedQuestions: (Para | ShortPara | BooleanQuestion | DropDownQuestion | MultipleChoiceQuestion | DateQuestion | NumberQuestion | FileUploadQuestion | VideoQuestion)[]
  }
 }
}

