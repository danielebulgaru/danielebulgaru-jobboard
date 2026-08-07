package danielebulgarujobboard.repository;

import danielebulgarujobboard.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidateIdOrderByAppliedAtDesc(Long candidateId);
    List<Application> findByJobIdOrderByAppliedAtDesc(Long jobId);
    Optional<Application> findByJobIdAndCandidateId(Long jobId, Long candidateId);
}
