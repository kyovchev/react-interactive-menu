import { useState } from "react";

import Form, { FormActions } from "../UI/Form.jsx";
import MenuPicker from "../Menu/MenuPicker.jsx";

export default function ArticleForm({ inputData, onSubmit, children }) {
  const [selectedMenu, setSelectedMenu] = useState(inputData?.menu);

  function handleSelectMenu(menu) {
    setSelectedMenu(menu);
  }

  function handleSubmit(article) {
    article.preventDefault();

    const formData = new FormData(article.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, menu: selectedMenu });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      <div>
        <MenuPicker onSelect={handleSelectMenu} selectedMenu={selectedMenu} />
      </div>

      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <p>
        <label htmlFor="price">Price (лв.)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0.00"
          step="0.01"
          defaultValue={inputData?.price ?? ""}
        />
      </p>

      <FormActions>{children}</FormActions>
    </Form>
  );
}
