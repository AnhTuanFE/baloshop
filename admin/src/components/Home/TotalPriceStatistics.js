export default function TotalPriceStatistics() {
    return (
        <div className="col-xl-4 col-lg-12" style={{ flex: '0 0 100%', maxWidth: '49.333333%' }}>
            <div className="card shadow-sm" style={{ padding: '0.5rem 1rem' }}>
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
                            height: '45vh',
                            padding: '0',
                        }}
                        src="https://charts.mongodb.com/charts-database_luan_van-zqxge/embed/charts?id=65049dae-8361-4226-80a7-de7a372ed0f7&maxDataAge=3600&theme=light&autoRefresh=true"
                        // src="https://charts.mongodb.com/charts-balostore-hpusx/embed/charts?id=6461cef4-ed26-4b09-8a66-d7a976b97f2c&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
}
