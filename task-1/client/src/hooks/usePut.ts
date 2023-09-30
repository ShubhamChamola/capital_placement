import { useState } from "react";
import { Data } from "../interfaces";

export default function usePut(url: string, setFormData: React.Dispatch<React.SetStateAction<Data | null>>, formData: Data | null) {

 const [error, setError] = useState<null | {
  message: string;
  status: number;
 }>(null);

 const [timeoutReference, setTimeoutReference] = useState<any>()

 const [rollBackState, setRollBackState] = useState<Data | null>(null)

 async function sendReq(body: Data) {
  try {
   const reqBody = JSON.stringify(body)
   const res = await fetch(url, {
    method: "PUT", headers: {
     'Content-Type': 'application/json',
    }, body: reqBody
   });

   if (!res.ok) {
    setFormData(rollBackState)
    throw new Error(`Form Edit Failed`);
   }

   setRollBackState(null)

  } catch (error: any) {
   setError(error);
  }
 }

 function triggerReq(body: Data) {
  if (!rollBackState) {
   setRollBackState(formData)
  }

  if (timeoutReference) {
   clearTimeout(timeoutReference)
  }

  const timer = setTimeout(() => {
   sendReq(body)
  }, 800)
  setTimeoutReference(timer)
  setFormData(body)
 }

 function resetError() {
  setError(null);
 }

 return { triggerReq, error, resetError }

}
