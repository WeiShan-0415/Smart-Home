package com.nz.backend.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nz.backend.entities.Device;
import com.nz.backend.entities.Family;
;



public interface DeviceRepo extends JpaRepository <Device, Long> {

     Device findByDeviceName (String device);

     Device findByDeviceNameAndFamily(String deviceName, Family family);

     List<Device> findByFamilyFamilyName(String familyName);

     List<Device> findByFamilyFamilyid(Long Familyid);
}
