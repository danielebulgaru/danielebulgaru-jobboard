package danielebulgarujobboard.controller;

import danielebulgarujobboard.dto.ApplicationRequest;
import danielebulgarujobboard.model.Application;
import danielebulgarujobboard.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {
    @Autowired private ApplicationService appService;

    @PostMapping
    public ResponseEntity<Application> apply(@RequestBody ApplicationRequest req,
                                             @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(appService.apply(req, userId));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Application>> getMyApps(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(appService.getMyApplications(userId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getJobApps(@PathVariable Long jobId,
                                                        @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(appService.getJobApplications(jobId, userId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id,
                                                    @RequestParam String status, @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(appService.updateStatus(id, status, userId));
    }
}
