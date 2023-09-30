import { useState } from "react";
import { Upload, message } from "antd";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uploadProps = {
    accept: "image/*",
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isSizeValid = file.size <= 1024 * 1024;
      if (!isSizeValid) {
        message.error("File size must be no greater than 1MB.");
      } else {
        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
      return isSizeValid;
    },
  };

  return (
    <div className="rounded-xl shadow-md flex flex-col max-w-450">
      <div className="bg-custom_grey px-5 py-4 ">
        <h2 className="text-lg font-semibold">Upload cover image</h2>
      </div>

      <div>
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full" />
        ) : (
          <div className="px-4 py-4 my-6 mx-3">
            <Upload.Dragger className="w-full h-full" {...uploadProps}>
              <div className="w-full h-full py-6">
                <p className="flex flex-col items-center gap-1">
                  <svg
                    height="25px"
                    viewBox="0 0 512 512"
                    width="25px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Solid">
                      <path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z" />
                      <path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z" />
                    </g>
                  </svg>
                  <span className="text-xm font-bold text-center">
                    Upload cover image
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              </div>
            </Upload.Dragger>
          </div>
        )}
      </div>
      {previewUrl && (
        <div
          className="px-5 py-5 flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setPreviewUrl(null);
            setFile(null);
          }}
        >
          <svg
            height="15px"
            viewBox="0 0 365.71733 365"
            width="15px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#A80000">
              <path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" />
              <path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" />
            </g>
          </svg>
          <span className="text-xs text-red-900 font-semibold">
            Delete & re-upload
          </span>
        </div>
      )}
    </div>
  );
}
