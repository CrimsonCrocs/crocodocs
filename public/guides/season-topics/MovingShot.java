import java.util.Optional;

/**
 * A drag-free shot candidate for a fixed-height launcher on a level chassis.
 * All displacement and launcher velocity inputs use the same field axes at
 * predicted release. Outputs describe velocity relative to the launcher.
 * This class does not predict release pose, model a moving target, calibrate
 * actuators, or check hardware and field limits.
 */
public final class MovingShot {
    public final double yawRadians;
    public final double pitchRadians;
    public final double speedMetersPerSecond;

    private MovingShot(double yaw, double pitch, double speed) {
        yawRadians = yaw;
        pitchRadians = pitch;
        speedMetersPerSecond = speed;
    }

    public static Optional<MovingShot> atFlightTime(
            double dxMeters, double dyMeters, double heightMeters,
            double launcherVx, double launcherVy, double flightSeconds) {
        if (!Double.isFinite(dxMeters) || !Double.isFinite(dyMeters)
                || !Double.isFinite(heightMeters)
                || !Double.isFinite(launcherVx) || !Double.isFinite(launcherVy)
                || !Double.isFinite(flightSeconds) || flightSeconds <= 0.0) {
            return Optional.empty();
        }

        double qx = dxMeters / flightSeconds - launcherVx;
        double qy = dyMeters / flightSeconds - launcherVy;
        double qz = heightMeters / flightSeconds + 9.81 * flightSeconds / 2.0;
        double horizontalSpeed = Math.hypot(qx, qy);
        double speed = Math.hypot(horizontalSpeed, qz);
        if (!Double.isFinite(speed) || horizontalSpeed < 1e-9) {
            return Optional.empty(); // No usable horizontal aim, or overflow.
        }

        return Optional.of(new MovingShot(
                Math.atan2(qy, qx), Math.atan2(qz, horizontalSpeed), speed));
    }
}
