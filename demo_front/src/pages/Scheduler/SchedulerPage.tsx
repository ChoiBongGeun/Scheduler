import { useCallback, useEffect, useState } from "react";
import useStores from "../../hooks/useStore";

const SchedulerPage =() => {
    const [open, setOpen] = useState(false);
    const { schedulerStore } = useStores();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        schedulerStore.search();
        console.log(schedulerStore)
    }, [schedulerStore])




    return (
        <div>
            <h1>test중입니다</h1>        
        </div>
    )
}

export default SchedulerPage;