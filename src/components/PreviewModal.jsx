export default function PreviewModal({ file, setShowPreview,isPreviewable }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={() => setShowPreview(false)}
    >
      <div
        className="bg-gray-800 p-6 rounded shadow-lg max-w-3xl w-full h-[80%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Preview: {file.name}
          </h2>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => setShowPreview(false)}
          >
            ✖
          </button>
        </div>
        <div className="w-full h-full">
          {isPreviewable ? (
            <iframe
              src={file.url}
              title="File Preview"
              className="w-full h-[90%] rounded border"
              allowFullScreen
            />
          ) : (
            <div className="text-center text-gray-500 pt-10">
              This file type cannot be previewed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
