package danielebulgarujobboard.controller;

import danielebulgarujobboard.dto.MessageResponse;
import danielebulgarujobboard.model.Notification;
import danielebulgarujobboard.model.SavedJob;
import danielebulgarujobboard.service.UtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilsController {
    @Autowired private UtilsService utilsService;

    @PostMapping("/saved-jobs/{jobId}")
    public ResponseEntity<SavedJob> saveJob(@PathVariable Long jobId,
                                            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(utilsService.saveJob(userId, jobId));
    }

    @DeleteMapping("/saved-jobs/{jobId}")
    public ResponseEntity<MessageResponse> unsaveJob(@PathVariable Long jobId,
                                                     @RequestAttribute("userId") Long userId) {
        utilsService.unsaveJob(userId, jobId);
        return ResponseEntity.ok(new MessageResponse("Rimosso"));
    }

    @GetMapping("/saved-jobs")
    public ResponseEntity<List<SavedJob>> getSaved(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(utilsService.getSavedJobs(userId));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifs(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(utilsService.getNotifications(userId));
    }
}