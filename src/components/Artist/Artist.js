import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { apiHostURL } from '../../config';
import axios from 'axios';

const Artist = (props) => {
    const [auth] = useContext(AuthContext);
    const [artist, setArtist] = useState({
        artistName: "",
        artistNameFormatted: "",
        members: [],
        records: [],

    });
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const _getArtist = await axios.get(`${apiHostURL}/api/records/artistByRecordId`)
    })

    return (
        <h1>Artist</h1>
    )
}

export default Artist;