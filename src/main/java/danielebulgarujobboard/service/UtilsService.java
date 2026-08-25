package danielebulgarujobboard.service;

import danielebulgarujobboard.model.JobOffer;
import danielebulgarujobboard.model.Notification;
import danielebulgarujobboard.model.SavedJob;
import danielebulgarujobboard.model.User;
import danielebulgarujobboard.repository.NotificationRepository;
import danielebulgarujobboard.repository.SavedJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UtilsService {
    @Autowired private SavedJobRepository savedRepo;
    @Autowired private NotificationRepository notifRepo;

    public SavedJob saveJob(Long candidateId, Long jobId) {
        SavedJob sj = new SavedJob();
        User u = new User(); u.setId(candidateId);
        JobOffer j = new JobOffer(); j.setId(jobId);
        sj.setCandidate(u); sj.setJob(j);
        return savedRepo.save(sj);
    }

    public void unsaveJob(Long candidateId, Long jobId) {
        savedRepo.findByCandidateIdAndJobId(candidateId, jobId).ifPresent(savedRepo::delete);
    }

    public List<SavedJob> getSavedJobs(Long candidateId) {
        return savedRepo.findByCandidateId(candidateId);
    }

    public List<Notification> getNotifications(Long userId) {
        return notifRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void createNotification(Long userId, String title, String message) {
        Notification n = new Notification();
        User u = new User(); u.setId(userId);
        n.setUser(u); n.setTitle(title); n.setMessage(message);
        notifRepo.save(n);
    }
}
