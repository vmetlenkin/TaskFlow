import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { createKanbanTask } from "../../../redux/slices/kanban";
import Modal from "../../ui/Modal";
import FormHeadingInput from "../../ui/FormHeadingInput";
import AvatarList from "../../ui/AvatarList";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewTaskSchema } from "../../../utils/validations";
import { CreateTaskRequest } from "../../../redux/api/task-api";

type Props = {
  show: boolean;
  column: string;
  onClose: () => void;
}

const CreateTaskModal: React.FC<Props> = (props) => {
  const router = useRouter(); 
  const { pid } = router.query;
  
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(NewTaskSchema)
  });

  const handleCreateTask = (dto) => {
    try {
      const request: CreateTaskRequest = {
        kanbanColumnId: props.column,
        title: dto.title,
        text: dto.text
      };

      dispatch(createKanbanTask(request));
      form.reset();
      props.onClose();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <Modal title="Новая карточка" show={props.show} onClose={props.onClose}>
      <div className="px-6 pb-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleCreateTask)} className="gap-6 font-semibold">
            <div>
              <FormHeadingInput name="title" placeholder="Название задачи" />
            </div>
            <div className="py-6 border-b dark:border-zinc-700">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Участники</div>
              <AvatarList text="ВМ" />
            </div>
            <div className="flex-1 py-6">
              <Textarea name="text" placeholder="Описание задачи..." />
            </div>
            <Button>Создать</Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;