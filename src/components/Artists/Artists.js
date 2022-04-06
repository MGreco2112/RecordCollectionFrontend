import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { apiHostURL } from '../../config';
import axios from 'axios';

const Artists = (props) => {
    const [auth] = useContext(AuthContext);
    const [artists, setArtists] = useState({
        artistName: "",
        artistNameFormatted: "",
        members: [],
        records: [],

    });
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const _getArtists = await axios.get(`${apiHostURL}/api/records/artistByRecordId`)
    })

    return (
        <h1>Artists</h1>
    )
}

export default Artists;