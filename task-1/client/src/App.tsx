import UploadImage from "./components/UploadImage";
import useFetch from "./hooks/useFetch";
import applicationForm from "./urls";
import { Alert } from "antd";
import { useState, useEffect } from "react";
import { Data } from "./interfaces";
import Profile from "./components/Profile";
import usePut from "./hooks/usePut";
import Personal from "./components/Personal";
import Additional from "./components/Additional";

function App() {
  const [formData, setFormData] = useState<null | Data>(null);

  const {
    response,
    isLoading,
    error: getError,
    resetError: resetGetError,
  } = useFetch(applicationForm.get);

  const {
    triggerReq,
    error: putError,
    resetError: resetPutError,
  } = usePut(applicationForm.put, setFormData, formData);

  useEffect(() => {
    if (response) {
      console.log(response);
      setFormData(response);
    }
  }, [response]);

  if (isLoading) return <>Loading....</>;

  return (
    <section className="w-full h-full px-10 py-5 my-9 flex flex-col gap-5">
      {getError && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 my-2">
          <Alert
            message={getError.message}
            type="error"
            showIcon
            closable
            closeIcon
            onClose={() => resetGetError}
          />
        </div>
      )}
      {putError && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 my-2">
          <Alert
            message={putError.message}
            type="error"
            showIcon
            closable
            closeIcon
            onClose={() => resetPutError}
          />
        </div>
      )}

      <h1 className="text-2xl font-bold text-center mb-4">Application Form</h1>
      <UploadImage />
      {formData && (
        <>
          <Personal formData={formData} triggerReq={triggerReq} />
          {formData && <Profile formData={formData} triggerReq={triggerReq} />}
          <Additional formData={formData} triggerReq={triggerReq} />
        </>
      )}
    </section>
  );
}

export default App;
