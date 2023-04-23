import { useParams } from 'react-router-dom';

import EditNews from '~/components/news/EditNews';

const EditNewsScreen = () => {
    const params = useParams();
    const idNews = params.id;
    return (
        <>
            <EditNews idNews={idNews} />
        </>
    );
};
export default EditNewsScreen;
