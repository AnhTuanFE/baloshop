export default function TotalPriceStatistics() {
    return (
        // style={{ flex: '0 0 100%', maxWidth: '49.333333%' }}
        // col-xl-4
        <div className="row col-lg-12 mt-5">
            <div className="card shadow-sm" style={{ padding: '2rem' }}>
                <article className="card-body p-0">
                    {/* <h4 className="card-title fw-bold">Doanh Thu</h4> */}
                    <iframe
                        title="Chart"
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '60vh',
                            padding: '0',
                        }}
                        src="https://charts.mongodb.com/charts-database_luan_van-zqxge/embed/charts?id=65049dae-8361-4226-80a7-de7a372ed0f7&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
}
