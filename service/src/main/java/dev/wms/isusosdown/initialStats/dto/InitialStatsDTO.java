package dev.wms.isusosdown.initialStats.dto;

import lombok.Value;

import java.util.ArrayList;
import java.util.List;

@Value
public class InitialStatsDTO {

    List<InitialServiceStatsDTO> runningServices;
    List<InitialDownServiceStatsDTO> downServices;
    String meme;

    public InitialStatsDTO(String meme) {
        this.runningServices = new ArrayList<>();
        this.downServices = new ArrayList<>();
        this.meme = meme;
    }

    public void addToRunningServices(InitialServiceStatsDTO runningService){
        runningServices.add(runningService);
    }
    public void addToDownServices(InitialDownServiceStatsDTO downService){
        downServices.add(downService);
    }
}
