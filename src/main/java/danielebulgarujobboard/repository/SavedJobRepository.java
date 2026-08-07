package danielebulgarujobboard.repository;

import danielebulgarujobboard.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByCandidateId(Long candidateId);
    Optional<SavedJob> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}
