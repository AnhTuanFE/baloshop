export default function TotalPriceStatistics() {
    return (
        <div className="col-xl-4 col-lg-12" style={{ flex: '0 0 100%', maxWidth: '49.333333%' }}>
            <div className="card mb-4 shadow-sm">
                <article className="card-body">
                    <h5 className="card-title">Thống kê Doanh thu</h5>
                    <iframe
                        title="Chart"
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '450px',
                        }}
                        src="https://charts.mongodb.com/charts-balostore-hpusx/embed/charts?id=6461cef4-ed26-4b09-8a66-d7a976b97f2c&maxDataAge=3600&theme=light&autoRefresh=true"
                    ></iframe>
                </article>
            </div>
        </div>
    );
}
