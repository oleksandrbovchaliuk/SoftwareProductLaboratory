import React, { useMemo } from "react";
import clsx from "clsx";

import Layout from "@common/Layout";

import TaskCard from "./parts/TaskCard";
import { UserType } from "@typings/enums/User";

import styles from "./styles.module.scss";

interface Props {
  isLoading?: boolean;
  tasks: Task[];
  taskResults: TaskResult[];
  user: User | null;
}

const View: React.FC<Props> = ({ isLoading, tasks, taskResults, user }) => {
  const isStudent = useMemo(() => user?.type === UserType.student, [user]);

  const tasksNode = useMemo(
    () =>
      tasks.map((task) => {
        const taskResult = taskResults.find(
          (taskResult) =>
            taskResult.userId === user?.id && taskResult.taskId === task.id
        );

        const canRedirect = isStudent && !taskResult;
        const mark = taskResult?.mark;

        return (
          <TaskCard
            key={task.id}
            task={task}
            canRedirect={canRedirect}
            mark={mark}
          />
        );
      }),
    [tasks, isStudent]
  );

  return (
    <Layout showLoader={isLoading}>
      <h1 className={clsx(styles["page-header"])}>Модуль проектування</h1>
      <div className={clsx(styles["tasks-main-wrapper"])}>
        <div className={clsx(styles["tasks-list-wrapper"])}>
          <h1 className={clsx(styles["news-header"])}>Завдання</h1>
          {tasksNode}</div>
        <div className={clsx(styles["tasks-list-wrapper"])}>
          <div className={clsx(styles["news-box"])}>
            <h1 className={clsx(styles["news-header"])}>News</h1>
            <div className={clsx(styles["news-single"])}>
              <img
                src="https://www.bannerbatterien.com/upload/filecache/Banner-Batterien-Windrder2-web_06b2d8d686e91925353ddf153da5d939.webp"
                alt="banner"
              />
              <div className={clsx(styles["news-info"])}>
                <h1 className={clsx(styles["news-card-title"])}>News 1</h1>
                <p className={clsx(styles["news-card-text"])}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente ipsa aut commodi sint doloremque omnis ex, numquam
                  illum ullam repellat vel doloribus ut aperiam voluptatibus!
                </p>
              </div>
            </div>
            <div className={clsx(styles["news-single"])}>
              <img
                src="https://www.bannerbatterien.com/upload/filecache/Banner-Batterien-Windrder2-web_06b2d8d686e91925353ddf153da5d939.webp"
                alt="banner"
              />
              <div className={clsx(styles["news-info"])}>
                <h1 className={clsx(styles["news-card-title"])}>News 1</h1>
                <p className={clsx(styles["news-card-text"])}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente ipsa aut commodi sint doloremque omnis ex, numquam
                  illum ullam repellat vel doloribus ut aperiam voluptatibus!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
