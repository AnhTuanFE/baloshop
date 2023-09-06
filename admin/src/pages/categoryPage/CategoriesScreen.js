import { useState } from 'react';
import CreateCategory from '~/components/Categories/CreateCategory';
import UpdateCategory from '~/components/Categories/UpdateCategory';
import CategoriesTable from '~/components/Categories/CategoriesTable';

const CategoriesScreen = () => {
    const [editInfo, setEditInfo] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const handleEditInfo = () => {
        setEditInfo(true);
    };
    const handleCurrentCategory = (category) => {
        setCurrentCategory(category);
    };
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title">Thêm danh mục</h2>
                </div>

                <div className="card  shadow-sm" style={{ height: '74vh' }}>
                    <div className="card-body overflow-auto">
                        <div className="row ">
                            {editInfo ? <UpdateCategory currentCategory={currentCategory} /> : <CreateCategory />}
                            <CategoriesTable
                                handleCurrentCategory={handleCurrentCategory}
                                handleEditInfo={handleEditInfo}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoriesScreen;
