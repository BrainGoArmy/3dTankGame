/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.team142.gg.server.model.mappable.organic;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author just1689
 */
@AllArgsConstructor
@Data
public class TileBitmap {

    private boolean canMoveOver;
    private boolean canShootOver;

}