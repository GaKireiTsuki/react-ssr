export function Loading() {
	return (
		<div className="loading-overlay">
			<div className="loading-spinner">
				<div className="spinner-ring" />
				<p className="loading-text">加载中...</p>
			</div>
		</div>
	);
}
