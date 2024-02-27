import Form from "@/app/ui/todaysactions/form";
import FormEmail from "@/app/ui/todaysactions/formemail";
import GoalInputTable from "./goalinputtable";

export default async function CombinedForm () {

    return(
        <div>
        <Form/>
        <FormEmail/>
        <GoalInputTable/>
        </div>
    );

};