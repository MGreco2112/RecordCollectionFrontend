import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { apiHostURL } from "../../config";
import Container from "../common/Container";
import { AuthContext } from "../Providers/AuthProvider";
import Record from "../Records/Record";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DisplayCollector = (props) => {
    const params = useParams();

    const [collector, setCollector] = useState({});

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const _fetchCollector = async () => {

            const res = await axios.get(`${apiHostURL}/api/collectors/username/${params.username}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            console.log(res.data);
            setCollector(res.data);
            setLoading(false);
        }
        setLoading(true);
        _fetchCollector();
    
    }, []);



    const formatPage = () => {
        return(
            <Container>
                <h1>{collector.name}</h1>

                <h2>Collection Info:</h2>
                <div style={{flexDirection: 'row'}}>

                    <div style={{flexDirection: 'column'}}>

                        {displayRecords()}
                               
                    </div>
                    <div style={{flexDirection: 'column'}}>
                        
                        {formatComments()}

                    </div>
                </div>
            </Container>
        )
    }

    const displayRecords = () => {
        
            if (collector.records.length !== 0) {

                <h3>Records Owned:</h3>
                {return collector.records.map(record => {
                    return <Record record={record} key={record.name} onSelect={onRecordSelect}/>
                })}
            }
    }

    const formatComments = () => {
        if (collector.comments.length !== 0) {
                <h3>Comments On Record:</h3>
            return(
                collector.comments.map(comment => {
                    return(
                        <Container>
                            <p>{comment.record.name}</p> <p>{comment.userComment}</p>
                        </Container>
                    )
                })
            )
        }
    }

    const onRecordSelect = (recordNameFormatted) => {
        navigate(`/records/${recordNameFormatted}`);
    }

    return(
        <Container>
            {loading ?
                <p>LOADING...</p>
                :
                formatPage()        
            }
        </Container>
    )
}

export default DisplayCollector;