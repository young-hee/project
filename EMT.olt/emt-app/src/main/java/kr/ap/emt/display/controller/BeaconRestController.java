/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.offlinestore.store.BeaconEventCollectResult;
import net.g1project.ecp.api.model.offlinestore.store.BeaconEventPost;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequesterResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/beacon")
public class BeaconRestController extends AbstractController {

    /** 비콘메시지 이벤트 수집
     * @param beaconEventPost
     * @return hashMap
     */
	@RequestMapping("/etude/zoyi/beaconEventCollect")
    public ResponseEntity<?> getApplicationVersion(@RequestBody BeaconEventPost beaconEventPost) {
      
		BeaconEventCollectResult requesterResult = storeApi.beaconEventCollect(beaconEventPost);

		return ResponseEntity.ok(requesterResult);
    }
}
