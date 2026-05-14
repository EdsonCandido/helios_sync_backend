export class HealthService {
	public async getStatus() {
		return { status: "ok" };
	}
}

export default new HealthService();
