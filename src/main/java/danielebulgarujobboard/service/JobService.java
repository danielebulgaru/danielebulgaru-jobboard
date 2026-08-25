package danielebulgarujobboard.service;

import danielebulgarujobboard.dto.JobOfferRequest;
import danielebulgarujobboard.model.JobOffer;
import danielebulgarujobboard.model.User;
import danielebulgarujobboard.repository.JobOfferRepository;
import danielebulgarujobboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    @Autowired private JobOfferRepository jobRepo;
    @Autowired private UserRepository userRepo;

    public List<JobOffer> getAllActiveJobs() {
        return jobRepo.findByStatusOrderByCreatedAtDesc("ACTIVE");
    }

    public JobOffer getJobById(Long id) {
        JobOffer job = jobRepo.findById(id).orElseThrow();
        job.setViewsCount(job.getViewsCount() + 1);
        return jobRepo.save(job);
    }

    public JobOffer createJob(JobOfferRequest req, Long recruiterId) {
        User recruiter = userRepo.findById(recruiterId).orElseThrow();
        JobOffer job = new JobOffer();
        job.setRecruiter(recruiter);
        job.setTitle(req.getTitle());
        job.setDescription(req.getDescription());
        job.setRequirements(req.getRequirements());
        job.setLocation(req.getLocation());
        job.setJobType(req.getJobType());
        job.setExperienceLevel(req.getExperienceLevel());
        job.setSalaryMin(req.getSalaryMin());
        job.setSalaryMax(req.getSalaryMax());
        job.setIsRemote(req.getIsRemote());
        job.setSkills(req.getSkills());
        return jobRepo.save(job);
    }

    public List<JobOffer> getRecruiterJobs(Long recruiterId) {
        return jobRepo.findByRecruiterIdOrderByCreatedAtDesc(recruiterId);
    }

    public void deleteJob(Long id, Long recruiterId) {
        JobOffer job = jobRepo.findById(id).orElseThrow();
        if (!job.getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Non autorizzato");
        job.setStatus("CLOSED");
        jobRepo.save(job);
    }
}
