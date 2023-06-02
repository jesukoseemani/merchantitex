import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { closeLoader } from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";



interface Props {
    data: [];
}
const useFetch = (url: any) => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);
    const [totalRows, setTotalRows] = useState<number>(0);

    const dispatch = useDispatch()
    useEffect(() => {

        setLoading(true)
        axios.get<any>(url)
            .then((res) => {

                setData(res?.data)
                setTotalRows(res?.data?.data?.length);
                setLoading(false)
                dispatch(closeLoader());

            })
            .catch(err => {
                dispatch(closeLoader());
                const { message } = err.response.data;
                dispatch(
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            msgType: "error"
                        })
                    )
                );
            })







    }, [url, pageNumber, rowsPerPage]);

    return [data, loading] as const

}

export default useFetch
