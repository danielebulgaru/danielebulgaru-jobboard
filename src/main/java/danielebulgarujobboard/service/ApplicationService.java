package danielebulgarujobboard.service;

import danielebulgarujobboard.dto.ApplicationRequest;
import danielebulgarujobboard.model.Application;
import danielebulgarujobboard.model.JobOffer;
import danielebulgarujobboard.model.User;
import danielebulgarujobboard.repository.ApplicationRepository;
import danielebulgarujobboard.repository.JobOfferRepository;
import danielebulgarujobboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired private ApplicationRepository appRepo;
    @Autowired private JobOfferRepository jobRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JavaMailSender mailSender;

    public Application apply(ApplicationRequest req, Long candidateId) {
        JobOffer job = jobRepo.findById(req.getJobId()).orElseThrow();
        User candidate = userRepo.findById(candidateId).orElseThrow();
        if (appRepo.findByJobIdAndCandidateId(req.getJobId(), candidateId).isPresent()) {
            throw new RuntimeException("Gia candidato!");
        }
        Application app = new Application();
        app.setJob(job);
        app.setCandidate(candidate);
        app.setCoverLetter(req.getCoverLetter());
        app = appRepo.save(app);
        job.setApplicationsCount(job.getApplicationsCount() + 1);
        jobRepo.save(job);

        sendEmail(candidate.getEmail(), "Candidatura inviata", "Hai candidato per: " + job.getTitle());
        sendEmail(job.getRecruiter().getEmail(), "Nuova candidatura",
                candidate.getFirstName() + " si e candidato per " + job.getTitle());
        return app;
    }

    public List<Application> getMyApplications(Long candidateId) {
        return appRepo.findByCandidateIdOrderByAppliedAtDesc(candidateId);
    }

    public List<Application> getJobApplications(Long jobId, Long recruiterId) {
        JobOffer job = jobRepo.findById(jobId).orElseThrow();
        if (!job.getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Non autorizzato");
        return appRepo.findByJobIdOrderByAppliedAtDesc(jobId);
    }

    public Application updateStatus(Long appId, String status, Long recruiterId) {
        Application app = appRepo.findById(appId).orElseThrow();
        if (!app.getJob().getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Non autorizzato");
        app.setStatus(status);
        app = appRepo.save(app);
        sendEmail(app.getCandidate().getEmail(), "Aggiornamento candidatura",
                "Lo stato per " + app.getJob().getTitle() + " e: " + status);
        return app;
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to); msg.setSubject(subject); msg.setText(text);
        try { mailSender.send(msg); } catch (Exception e) { e.printStackTrace(); }
    }
}
