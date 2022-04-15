import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { apiHostURL } from '../../config';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Record from '../Records/Record';
import axios from 'axios';

const DisplayArtist = (props) => {
    
    const params = useParams();
    const navigate = useNavigate();
    const [artist, setArtist] = useState({
        nameFormatted: params.artistNameFormatted,
    });

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchArtist = async () => {
            console.log(params);

            const res = await axios.get(`${apiHostURL}/api/records/artist/${params.artistNameFormatted}`, {
                    headers : {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            console.log(res.data);
            setArtist(res.data);
            setLoading(false);
        }

        // const _fetchRecords = async (selArtist) => {
        //     console.log(artist);

        //     const res = await axios.get(`${apiHostURL}/api/records/recordByArtist/${params.artistNameFormatted}`, {
        //         headers : {
        //             Authorization: `Bearer ${auth.token}`
        //         }
        //     })
        //     console.log(res.data);
        //     setRecords(res.data);
        //     setLoading(false);
        // }


        setLoading(true);
        _fetchArtist();
        // _fetchRecords(artist);
        console.log(artist);
    }, [])

    const onSelect = (recordId) => {
        navigate(`/records/${recordId}`);
    }

    return (
        <Container>
            {loading ?
                <h1>LOADING...</h1>
                :
                <Container>
                    <h1>{artist.artistName}</h1>

                    <h2>Members:</h2>

                    {artist.members.map(member => {
                        return <p>{member}</p>
                    })}

                    <h2>Records</h2>

                    {records.map(record => {
                        return <Record record={record} key={record.id} onSelect={onSelect}/>
                    })}
                </Container>
                
            }
        </Container>
    )
}

export default DisplayArtist;