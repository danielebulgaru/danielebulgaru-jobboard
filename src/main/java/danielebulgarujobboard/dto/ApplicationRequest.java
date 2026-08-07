package danielebulgarujobboard.dto;

public class ApplicationRequest {
    private Long jobId;
    private String coverLetter;
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
}
