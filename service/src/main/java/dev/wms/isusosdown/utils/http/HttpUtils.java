package dev.wms.isusosdown.utils.http;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.time.Duration;

public class HttpUtils {


    public static Response makeRequestWithTimeout(String url, Duration duration) throws IOException {

        OkHttpClient client = new OkHttpClient().newBuilder()
                .readTimeout(duration)
                .build();

        Request request = new Request.Builder()
                .url(url)
                .build();

        return client.newCall(request).execute();

    }

}
