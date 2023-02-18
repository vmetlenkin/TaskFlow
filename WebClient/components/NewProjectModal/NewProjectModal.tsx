import React, {useState} from 'react';
import Modal from "../ui/Modal";
import AvatarList from "../ui/AvatarList";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {FormProvider, useForm} from "react-hook-form";
import FormHeadingInput from "../ui/FormHeadingInput";
import { addProject } from "../../redux/slices/project";
import Textarea from "../ui/Textarea";
import { ProjectApi } from "../../redux/api/project-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewProjectTaskSchema } from "../../utils/validations";

type Props = {
  show: boolean,
  onClose: () => void
}

const NewProjectModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.data.id);
  
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(NewProjectTaskSchema)
  });
  
  const handleCreateProject = async (dto) => {
    try {
      dto.userId = userId;
      const response = await ProjectApi.create(dto);
      dispatch(addProject(response));
      props.onClose();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <Modal title="Создать проект" show={props.show} onClose={props.onClose}>
      <div className="px-6 pb-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleCreateProject)} className="gap-6 font-semibold">
            <div>
              <FormHeadingInput name="name" placeholder="Название проекта"/>
            </div>
            <div className="py-6 border-b">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Участники</div>
              <AvatarList text="ИФ" />
            </div>
            <div className="flex-1 py-6">
              <Textarea name="description" placeholder="Расскажите о своем проекте..." />
            </div>
            <Button>Создать проект</Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default NewProjectModal;