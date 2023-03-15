import { getTasks, archiveTask } from "../../modules/notion-client";
import { NotionIdentificator } from "../../types/notion";
 
export const archiveTasksNotion = () => {
    getTasks()
        .then(async (tasks) => {
            console.log(JSON.stringify(tasks));

            const { results } = tasks;
            const archiveTasksPromise = results.map(task => archiveTask(task.id as NotionIdentificator));

            await Promise.allSettled(archiveTasksPromise);
            console.log("Done!")
        })
        .catch(err => {
            const { code, status, body } = err;
            console.error({
                status,
                code,
                body
            });
        });
};