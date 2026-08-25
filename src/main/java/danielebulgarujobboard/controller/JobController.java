package danielebulgarujobboard.controller;

import danielebulgarujobboard.dto.JobOfferRequest;
import danielebulgarujobboard.dto.MessageResponse;
import danielebulgarujobboard.model.JobOffer;
import danielebulgarujobboard.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    @Autowired private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobOffer>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllActiveJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOffer> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<JobOffer> createJob(@RequestBody JobOfferRequest req,
                                              @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(jobService.createJob(req, userId));
    }

    @GetMapping("/my-jobs")
    public ResponseEntity<List<JobOffer>> getMyJobs(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(jobService.getRecruiterJobs(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteJob(@PathVariable Long id,
                                                     @RequestAttribute("userId") Long userId) {
        jobService.deleteJob(id, userId);
        return ResponseEntity.ok(new MessageResponse("Offerta chiusa"));
    }
}
