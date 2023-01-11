package com.scheduler.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResult<T> {
    private String errorCode;
    private T data;

    public void setSuccess()
    {
        errorCode = "0";
    }

    public void setFail()
    {
        errorCode = "-1";
    }
}
