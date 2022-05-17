import React, {useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { apiHostURL } from "../../config";

const DeleteRecord = (props) => {
    const [auth] = useContext(AuthContext);

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const deleteRecord = async () => {
            console.log(true);

            if (auth.token) {
                try {

                    const deletedRecord = {id: params.recId}
    
                    const res = await axios.delete(`${apiHostURL}/api/records/${params.recId}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
    
                    alert(`Record deleted successfully`);
    
                    navigate(`/`);
                } catch (err) {
                    console.error(err.message ? err.message : err.response);
                }
            }
            


        }

        deleteRecord();
    }, [auth]);

    return(
        <h1>Delete Record</h1>
    )
}

export default DeleteRecord;