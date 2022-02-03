FROM gradle:6.9-jdk11

USER root

COPY server app

RUN apt-get update && apt-get install -y npm nodejs git android-sdk

ENV ANDROID_HOME /usr/lib/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/tools
ENV PATH ${PATH}:${ANDROID_HOME}/tools/bin
ENV PATH ${PATH}:${ANDROID_HOME}/platform-tools

# RUN mkdir -p ${ANDROID_HOME} && \
#     cd ${ANDROID_HOME} && \
#     wget -q https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -O android_tools.zip && \
#     unzip android_tools.zip && \
#     rm android_tools.zip


RUN npm install -g n

RUN n 12.18

RUN npm install yarn -g

WORKDIR app

RUN yarn