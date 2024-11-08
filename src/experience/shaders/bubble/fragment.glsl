in vec2 vUv;

uniform float uTime;

uniform int uMaxSteps;
uniform float uMaxDistance;
uniform float uEpsilon;

uniform vec3 uCamPosition;
uniform mat4 uCamInvProjMatrix;
uniform mat4 uCamToWorldMatrix;


uniform vec3 uSpherePositions[MAX_SPHERES];
uniform float uSphereRadius[MAX_SPHERES];
uniform int uNumSpheres;

uniform vec3 uLightColor;
uniform vec3 uBubbleColor;
uniform vec3 uBackgroundColor;


// smooth min function
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float scene(vec3 position) {
    float minDis = uMaxDistance;
    float time = uTime * 0.001;

     for (int i = 0; i < uNumSpheres; i++) {

        vec3 animatedPosition = uSpherePositions[i];

        animatedPosition.x += 5.0 * sin(time + float(i));
        animatedPosition.z += 3.0 * cos(time + float(i) * 2.0); 

        float sphereDis = distance(position, animatedPosition) - uSphereRadius[i];

        minDis = smin(minDis, sphereDis, 0.5);
     }

    return minDis;
}


// from https://iquilezles.org/articles/normalsSDF/
vec3 normal(vec3 p) 
{
    vec3 n = vec3(0.0, 0.0, 0.0);
    vec3 e;
    for(int i = 0; i < 4; i++) {
        e = 0.5773 * (2.0 * vec3((((i + 3) >> 1) & 1), ((i >> 1) & 1), (i & 1)) - 1.0);
        n += e * scene(p + e * uEpsilon);
    }

    return normalize(n);
}

float rayMarch(vec3 rayOrigin, vec3 rayDirection)
{
    float totalDistance = 0.0; // total distance travelled

    for (int i = 0; i < uMaxSteps; ++i) {
        vec3 rayPosition = rayOrigin + totalDistance * rayDirection;
        float sceneDistance = scene(rayPosition); // get scene distance
        
        // if we have hit anything or our distance is too big, break loop
        if (sceneDistance < uEpsilon || totalDistance >= uMaxDistance) break;

        // otherwise, add new scene distance to total distance
        totalDistance += sceneDistance;
    }

    return totalDistance; // finally, return scene distance
}


void main() {
    vec3 lightDirection = vec3(0.0, 2.0, 1.0);
    float diffIntensity = 0.8;
    float specularIntensity = 0.1;
    float shininess = 2.0;
    float ambientIntensity = 0.8;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 bubbleColor = vec3(1.0, 1.0, 1.0);

    vec2 uv = vUv.xy;
    vec3 rayOrigin = uCamPosition;
    vec3 rayDirection = (uCamInvProjMatrix * vec4( uv * 2.0 - 1.0 , 0.0, 1.0)).xyz;
    rayDirection = (uCamToWorldMatrix * vec4(rayDirection, 0.0)).xyz;
    rayDirection = normalize(rayDirection);

    // Ray marching and find total distance travelled
    float disTravelled = rayMarch(rayOrigin, rayDirection); // use normalized ray

    if (disTravelled >= uMaxDistance) { 
        // if ray doesn't hit anything
        gl_FragColor = vec4(0.0);
    } else{
        // Find the hit position
        vec3 hitPosition = rayOrigin + disTravelled * rayDirection;
        vec3 modelNormal = normal(hitPosition);
        // Calculate diffuse model
        float dotNL = dot(modelNormal, lightDirection);
        float diffuse = max(dotNL, 0.0) * diffIntensity;
        float specular = pow(diffuse, shininess) * specularIntensity;
        float ambient = ambientIntensity;

        float camDistance = distance(hitPosition, uCamPosition);
        float fogAmount = max(1.0 - smoothstep(0.0, 25.0, camDistance), 0.25);

        vec3 color = uLightColor * (uBubbleColor * (specular + ambient + diffuse)) ;
        vec3 mixColor = mix(uBackgroundColor, color, fogAmount);
        gl_FragColor = vec4(mixColor, 1.0);
    }
}