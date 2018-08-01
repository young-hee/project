package kr.ap.comm.api;

public class APIException extends Exception {

	private static final long serialVersionUID = -4556816727564388396L;
	
	private APIError error;
	private int status;

	public APIException(APIError error, int status) {
		this.error = error;
		this.status = status;
	}

	public APIError getError() {
		return error;
	}

	public void setError(APIError error) {
		this.error = error;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
