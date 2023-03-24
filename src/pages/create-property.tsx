import { Form } from "components/common";
import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";

const CreateProperty = () => {
  const { data: user } = useGetIdentity<{
    email: string;
  }>();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please Upload a Photo");
    // Sent to server controller via refine
    await onFinish({ ...data, photo: propertyImage.url, email: user?.email });
  };

  return (
    <Form
      type="Create"
      register={register}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinish={onFinish}
      formLoading={formLoading}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
