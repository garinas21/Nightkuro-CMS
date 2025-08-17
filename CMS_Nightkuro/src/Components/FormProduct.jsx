const FormProduct = ({
  handleSubmit,
  handleChange,
  handleDrop,
  handleDragOver,
  handleRemoveImage,
  handleFileChange,
  formData,
  errorMessage,
  category,
  image,
  imgUrl,
  action,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="self-center bg-white w-8/10 rounded-2xl shadow-xl mt-5 p-8 flex gap-6"
    >
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">{`${action} Product`}</h2>
        <hr />
        <label className="block my-2 text-sm font-bold">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          className="w-full border rounded-lg p-2 mb-2"
          onChange={handleChange}
          value={formData?.name}
        />
        {errorMessage?.name && (
          <p className="font-semibold text-red-600 mb-2">
            {errorMessage?.name}
          </p>
        )}
        <label className="block mb-2 text-sm font-bold">Description</label>
        <textarea
          rows="3"
          name="description"
          placeholder="Enter product description..."
          className="w-full border rounded-lg p-2 mb-2"
          value={formData?.description}
          onChange={handleChange}
        ></textarea>
        {errorMessage?.description && (
          <p className="font-semibold text-red-600 mb-2">
            {errorMessage?.description}
          </p>
        )}
        <label className="block mb-2 text-sm font-bold">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          className="w-full border rounded-lg p-2 mb-2"
          onChange={handleChange}
          value={formData?.price}
        />
        {errorMessage?.price && (
          <p className="font-semibold text-red-600 mb-2">
            {errorMessage?.price}
          </p>
        )}
        <label className="block mb-2 text-sm font-bold">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          className="w-full border rounded-lg p-2 mb-2"
          onChange={handleChange}
          value={formData?.stock}
        />
        {errorMessage?.stock && (
          <p className="font-semibold text-red-600 mb-2">
            {errorMessage?.stock}
          </p>
        )}
        <label className="block mb-2 text-sm font-bold">Category</label>
        <select
          name="CategoryId"
          className="w-full border rounded-lg p-2 mb-2"
          onChange={handleChange}
          value={formData?.CategoryId}
        >
          <option value="">Select category</option>
          {category.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {errorMessage?.CategoryId && (
          <p className="font-semibold text-red-600 mb-2">
            {errorMessage?.CategoryId}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-950 mt-4 hover:bg-blue-900 text-white px-6 py-2 rounded-lg w-full"
        >
          {`${action} Product`}
        </button>
      </div>
      <div
        className="flex-1 border-2 border-dashed border-blue-950 rounded-xl flex flex-col justify-center items-center p-6 text-center cursor-pointer relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image || imgUrl ? (
          <div className="relative w-full">
            <img
              src={image ? URL.createObjectURL(image) : imgUrl}
              alt="preview"
              className="w-full min-h-64 object-cover border-4 border-slate-200 rounded-t-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-slate-200 content-center rounded-b-lg text-white text-lg font-semibold no-underline h-10 w-full px-2 flex items-center justify-center hover:text-red-500 fa-solid fa-trash"
            ></button>
          </div>
        ) : (
          <>
            <p className="font-semibold">Drop image here</p>
            <p className="my-2 text-gray-500">OR</p>
            <label className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer">
              Upload Image
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </>
        )}
      </div>
    </form>
  );
};

export default FormProduct;
