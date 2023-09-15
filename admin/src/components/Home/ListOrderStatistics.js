const ListOrderStatistics = () => {
    return (
        <div className="col-xl-4 col-lg-12" style={{ flex: '0 0 100%', maxWidth: '49.333333%' }}>
            <div className="card shadow-sm" style={{ padding: '0.5rem 1rem' }}>
                <article className="card-body p-0">
                    {/* <h5 className="card-title fw-bold">Đơn hàng</h5> */}
                    {
                        <iframe
                            title="list-order"
                            style={{
                                background: '#FFFFFF',
                                border: 'none',
                                borderRadius: '2px',
                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                                width: '100%',
                                height: '45vh',
                            }}
                            src="https://charts.mongodb.com/charts-database_luan_van-zqxge/embed/charts?id=65049be2-caa5-4c15-81c2-bc18c53580a0&maxDataAge=3600&theme=light&autoRefresh=true"

                            // src="https://charts.mongodb.com/charts-balostore-hpusx/embed/charts?id=6461ccc5-2da3-4020-8690-6df9ee116b9d&maxDataAge=3600&theme=light&autoRefresh=true"
                        ></iframe>
                    }
                </article>
            </div>
        </div>
    );
};

export default ListOrderStatistics;
