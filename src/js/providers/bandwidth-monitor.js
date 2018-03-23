import { BANDWIDTH_ESTIMATE } from 'events/events';
import { _isNumber } from 'utils/underscore';

export default function BandwidthMonitor(provider, initialEstimate) {
    let bandwidthMonitorInterval = null;
    let bandwidthEstimate = initialEstimate;
    return {
        start() {
            setInterval(() => {
                const bwEstimate = provider.getBandwidthEstimate();
                if (!bwEstimate) {
                    return;
                }
                bandwidthEstimate = bwEstimate;
                provider.trigger(BANDWIDTH_ESTIMATE, {
                    bandwidthEstimate
                });
            }, 1000);
        },
        stop() {
            clearInterval(bandwidthMonitorInterval);
        },
        getEstimate() {
            return bandwidthEstimate;
        }
    };
}